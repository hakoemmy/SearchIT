# Andela Rwanda Cycle 11 Technical Challenge

Instructions for submission
Create an account on [Codepen.io](https://codepen.io/) and attempt the following question. You are required to
make use of only HTML, CSS and JavaScript, and NO FRAMEWORKS. Please submit via this
form before 4 pm on Sunday, August 18th, 2019.

## Project Title: searchIT
### Context
Implement a simple application for searching US cities by city or state name and
returning their details. Pay close attention to details in the task and UI Design
instructions below.

### Task

* Use JavaScript to fetch data from [http://tiny.cc/fdj6az](http://tiny.cc/fdj6az). This URL will return an
array of data in the following format:

```
   [
{
"city": "New York",
"growth_from_2000_to_2013": "4.8%",
"latitude": 40.7127837,
"longitude": -74.0059413,
"population": "8405837",
"rank": "1",
"state": "New York"
},
{
"city": "Los Angeles",
"growth_from_2000_to_2013": "4.8%",
"latitude": 34.0522342,
"longitude": -118.2436849,
"population": "3884307",
"rank": "2",
"state": "California"
}
]
```
* There will be 1000 entries in the response.
* You are not allowed to use a third-party library for fetching the data. Use only
built-in tools that can fetch data from a URL like fetch().
* Use Vanilla JavaScript to write the logic necessary to return all cities that match
a search query.
* A valid search query will be either a city or a state or both.
* A state has several cities. For example, Texas has Houston, Dallas, San
Antonio, etc.
* Upon search, the results should be all cities with their details. For example, if the
query is “new”, the output should include cities like New York, New Mexico, New
Orleans, New Haven. What that means is that the search query has to match
either the city or the state.
### General Use Case:
 * When a user searches for a city or a state they get back the details
### Edge cases to handle:
* What if the search query is not a string?
* What if the search query is an empty string?
* What if the search query has more spaces for compound names? For example:
“New york” instead of “New York”?
*  Display the population of cities with comma separation after every 3
digits. I.e. 1,000 instead of 1000.
## UI Design
  The SearchIT UI contains three parts:
* **The title** with “searchIT” as the text
    - Make its font family a cool/fancy font family from [google fonts](https://fonts.google.com)
    - Make the title visible enough. You can play with colors, gradients,
and the font size.
* **The search box** which will basically be an input box
   - Put the search box on the right side of the title.
   - Make it bigger than the title.
   - Make sure that it has a clean background.
   - Make sure that the input text is readable.
   - Also, make the font size the same for both the placeholder and the
input.
   - Give the search box a placeholder text of “City or State”.
   - Make the placeholder text subtle by using a color like light grey
*  **The results list** has to be displayed in this format. City, State, population
   - Make the growth % either red or green based on if the value is
below or above zero respectively
and the growth %.
### General Use Cases:
* As a user types a name of the city or a state in the search box, a function
will be run in the background and it will return a list of all matches (cities).
These matches have to either contain the query in the city or state
names.

* Make sure you make the app design looks as minimal and straight to the point as
possible. The user has to know what to do with little effort
## BONUS
 * Make the top part stick to the top as we scroll through the results.
* Highlight the search query in the result with yellow background color. For example, if
the query is new, the output should include cities like New Mexico, New
Orleans, New Haven.
* Add a model using just CSS, JS and HTML to display the city details if a user
clicks on one result. You will have to make the results clickable and close the
model with a close (X) button or when you click outside the model. This is all up
to you how you want o to handle the user experience.
