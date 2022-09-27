# Symbolic Controller DB

The SDL controller DB provides useful abstract descriptions of *where*
buttons are, but hammers them all into the terminology of an Xbox 360
controller.

Showing users inputs on their controller using only the SDL DB is a
poor and messy experience for users and developers alike.

What if we had a free database of what controllers *look* like, in
addition to how they're shaped and interfaced with?

This database is offered under the same permissive license as the
SDL controller DB it's designed to be used alongside; the zlib
license. Your obligations using this database are the same as using the
SDL database.

## Contributing

You will need to know the SDL GUIDs of your controller, such as 05000000050b00000045000040000000.
Create a file at e.g. `src/asus-gamepad.json` describing the controller. The
filename is not included in the release JSON; it's just an identifier during
authoring. Check `src/_example.json` for the general structure.

See [symbols.json](symbols.json) for an iteration of all currently defined
symbolic colors and buttons, and their default values.

Pull requests very welcome. A database like this is only as useful as the
quantity of controllers it describes.

Not sure how to write the needed JSON file? Open an issue with the SDL GUID
of your controller and a picture of it from the relevant angles; from in front
and above, on most controllers. If the controller is designed for some
specific software or console, also include information on how its buttons
are displayed there.

## Usage

Unlike the SDL DB, this DB is not tied to a particular software project;
the "reference library" is the implementation of this in unvkit, my 2D
Java game engine that uses GLFW. But this is not the "one true library".

Under Releases, a merged JSON file containing an array of every defined
controller with comments removed is offered. The structure is, roughly:

```js
{
	"controllers": [
		{
			// controller definition like those in src
			"name": "Foo Bar Inc. Gameius Padius",
			"guids": [
				"01234567890123456789012345678901",
				"12345678901234567890123456789012"
			],
			"buttons": {
				// ...
			}
			// _comment keys are removed and string buttons are resolved
		}
	],
	"symbols": {
		// the contents of symbols.json with _comment keys removed, e.g.
		"power": {
			"shape": "circle",
			"icon": "power",
			"text": "⏻",
			"text_basic": "Power"
		}
	}
}
```

## Prior Art

I am aware of [cxong/SDL_JoystickButtonNames](https://github.com/cxong/SDL_JoystickButtonNames),
but it has few controllers and I disagree with its design decisions. The
choice to always describe buttons textually rather than symbolically causes
confusion between e.g. X and Cross buttons, and doesn't provide room for
icons. Additionally, its explicit RGB values are hard to make mesh with
a dark design.

It also does not explain whether the colors are the color of the button, or
the legend. This database describes everything symbolically, giving the UI
designer complete freedom of how to draw the icons, and the freedom to
choose colors that mesh best with their design.

Additionally, the SDL DB format is very poor for authoring, and is highly
prone to merge conflicts. This repo chooses one JSON file per controller as
an authoring format and provides a simplistic build script to create a familiar
TXT format.
