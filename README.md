# Vaibhav (@vrongmeal)

> About, Blog and Projects of Vaibhav, a.k.a., @vrongmeal

This website can also be used as a template repository for a [Jekyll](https://jekyllrb.com/)
blog/portfolio.

## Building

> Requires [Ruby](https://www.ruby-lang.org/) >= 2.6
>
> Requires [Bundler](https://bundler.io/) >= 2.1

1. Clone and change your directory as the cloned repository.

   ```sh
   $ git clone https://github.com/vrongmeal/vrongmeal.github.io.git
   $ cd vrongmeal.github.io
   ```

2. Install dependencies.

   ```sh
   $ bundle install
   ```

3. Build the site into `./_site`.

   ```sh
   $ bundle exec jekyll build
   ```

### Development

Use the build command with either `--watch` flag or use the serve command
to spawn a server.

```sh
# Watches for changes
$ bundle exec jekyll build --watch

# Spawns a server on port :4000 along-with watch
$ bundle exec jekyll serve
```

## ToDo

- [ ] Responsive
- [ ] Heading links
- [ ] Image magnify
