### Create a Drawing App with HTML5 Canvas and JavaScript

Based on article located at: http://wmalone.com/draw

It's a fork of https://github.com/sdavidson15/Simple-HTML5-Drawing-App.git which is the bare-bones version of the original   https://github.com/williammalone/Simple-HTML5-Drawing-App.git

It adds back mobile support, as done in the original code, by considering touch events too.

If you leave the drawing area, then return to it, the painting stops on desktop browsers, BUT it continues on mobile browsers.
Not sure why is it like that, but our use-case is mobile only, hence this issue is not addressed.
Consequently IE support is removed too.

For easy development I recommend the [hugo](https://gohugo.io/commands/hugo_server/),
because it's self contained and has a built-in live-reload feature.
It's also possible to bind it to all of your network interfaces,
so you can simultaneously test your site on mobile browsers.
Just run it as:

```bash
hugo server --bind 0.0.0.0 --contentDir .
```

To inspect whats happening on a mobile Firefox for example, you can
use its built-in, over the WiFi, remote-debugging capabilities:
https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging/Debugging_Firefox_for_Android_over_Wifi
