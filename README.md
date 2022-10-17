# brewdy


Brewdy is open source homebrewing software built in react. The result of about 6 hours of hacking so far, it's pre-pre-pre-alpha.


## Near term goals
- A data model based on [beerjson](https://beerjson.github.io/)
- Edit and save recipes (to localstorage). 
- Automatically calculate useful quantities (OG, FG, ABV) for an all grain brew.
- Automatic unit conversions.
- Web-based but no login required.

## Mid term goals
- A database of brewing ingredients.
- More exotic brewing types

## Long term goals
- A native desktop application (probably via [tauri](https://tauri.app/))
- Plugin algorithms and calculators.
- Support for logging brewing data.
- Support for [grainfather bluetooth protocol](https://github.com/kingpulsar/Grainfather-Bluetooth-Protocol)

![Screenshot](/web/screenshot1.png?raw=true "Screenshot")

## Tech stack
- [React](https://reactjs.org/)
- [tailwindcss](https://tailwindcss.com/)
- [beerjson](https://github.com/beerjson/beerjson)
