# To Do List
This is my first attempt at a simple web app for keeping track of things that need doing.

The header contains buttons that load from and save to session storage, as well as reload/clear the page. The last list item has an add button that starts a new line, which is replaced by a checkbox when clicked. All other lines also have a button that allows the user to delete the line.

I spent a little over 3 days on this project after finishing David Gray's javascript course, and feel like I had bitten off a bit more than I could chew. I had a list of features I wanted to implement, a good idea of the user interface/user experience, and I developed each one as I went along. I was able to get all the functionality up and running until I realized I wouldn't be able to implement the most important feature, saving/loading, with how I had written everything so far. It was clear I needed to abstract many properties and functions, but then ran into readability issues assigning and retreiving them due to scope.

I ended up spending as much time trying to refactor as I had spent on getting as far as I had, before deciding to step back and rewrite it all in pseudocode. That allowed me to more clearly determine what classes and methods I needed and how I would bring it all together. Unfortunately, there were still enough things I didn't account for that I think are too complex to refactor at my current skill level.

Overall, I feel like this was a valuable experience that highlighted the importance of:
- pseudocoding
- appropriate variable and function names
- abstracting code into managable objects
- keeping code blocks "atomic" like git commits 

There remain several things wrong that are yet to be fixed, but I will circle back these once I have a better understanding of things:
- existing and newly added items have duplicate event listener code
- listeners are not removed when deleting an item
- drag and drop functionality not yet implement

In the previous project, I got sucked into trying to develop a finished product before knowing all that I needed, and lost a lot of time as a result. I've learned a lot from this project and what I need to improve on, so I'll be leaving this here for now and getting started on the next.