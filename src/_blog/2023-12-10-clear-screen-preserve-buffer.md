---
title: Clear screen and preserve scroll buffer on Wezterm
description: |
  A short post about my struggle with clearing screen on Wezterm using the
  Ctrl-L keybinding.

---
I have been using Wezterm for quite a while now. With built-in support for
multiple tabs and panes, a flexible Lua config, and many features, my terminal
experience has never been better. But it has its quirks.

One thing that has been bothering me for a while is Wezterm losing the contents
of my screen when I hit Ctrl-L to clear the screen. I tried the same on the
default macOS Terminal, and it preserves the contents in the scroll buffer but
not on Wezterm.

Reading more into it, `Ctrl-L` prints `\33[H\33[2J` to the screen. Running a
simple `printf '\33[H\33[2J'` verified it. Contents on my screen did vanish from
my scrollback buffer.

<iframe
  src="https://www.youtube.com/embed/q-hy6RzNNwM"
  title="Original clear-screen behaviour"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>

## Solution

I wrote a simple function in my `~/.zshrc` to resolve this:

```bash
my-clear() {
  for i in {3..$(tput lines)}
  do
    printf '\n'
  done
  printf '\33[H\33[2J'
}
```

The above code gets the number of lines for the current terminal, i.e., the
height of the terminal, using tput lines and prints \n (new lines). In the end,
it prints the magic string \33[H\33[2J to clear the contents of the screen,
which, in this case, are empty lines that I don't need.

> The loop runs from 3 to tput lines (inclusive). It does not start from 1
> because my prompt is a two-liner, and printing \33[H\33[2J takes it into
> account (somehow).

### Key binding

I will never use `my-clear` as a command to clear my screen. To bind `Ctrl-L` to
this command, I used `bindkey` (since I use ZSH):

```bash
bindkey -s '^L' '^Qmy-clear\n'
```

`bindkey -s` sends the signals directly, so here is how it works:

* `^Q`: Clears the line and restores once the current command executes.
* `my-clear`: The function name.
* `\n`: Hit return to run the function.

The only issue with this is that my history now has an extra command, so
either I need to train my reflexes to check for the last command (rather than
mindlessly executing the previous command), or I figure out how to clear the
session history (which seems very unlikely from first impressions).

<iframe
  src="https://www.youtube.com/embed/Zf8zFoEeqW8"
  title="Clear screen behaviour after fix"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>

## ZSH Widgets

There is another solution to this: using widgets instead of sending in the
command directly.

```bash
my-clear() {
  for i in {3..$(tput lines)}
  do
    printf '\n'
  done
  printf '\33[H\33[2J'
  zle reset-prompt
}
zle -N my-clear
bindkey '^L' my-clear
```

`zle -N` creates a new widget from the function `my-clear`. We bind the key
directly to the widget (without the `-s` flag). We also need to reset the prompt
at the end of executing the widget since ZSH doesn't redraw the prompt when
executing a widget.

And voila! We can now use `Ctrl-L` to clear the screen and preserve everything.

A final refinement can be to combine the `printf` and `reset-prompt` statements with the `clear-screen` widget.

<iframe
  src="https://www.youtube.com/embed/On5NzQgo4kM"
  title="Clear screen with ZSH widget (Final)"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>

## Final code

```bash
my-clear() {
  for i in {3..$(tput lines)}
  do
    printf '\n'
  done
  zle clear-screen
}
zle -N my-clear
bindkey '^L' my-clear
```
