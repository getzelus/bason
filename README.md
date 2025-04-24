# Smallbase 

Local JSON database for consistents Node.js projects.
Execute your CRUD operations synchronously without external dependencies.


## Usage

When you create your first entry, it will create a new folder for your database (you choose the path). 
Then it will create a new json file per collection (col) to improve performance and organization. 

For every operation, as the first string argument, you need to specify the name of he collection (eg 'users').
The majority of operations need a second object argument to create or find an element. 
In this case, you only need one parameter (eg {name: 'Bob'}).

The functions should return the object or an array if they succeed. 
If they dont find the request, they will return undefined. 
If there is a bug, an error will be raised and the program wont crash if you use try catch.  


## Installation

```bash
npm install smallbase
```


## Code

```javascript
import sb from 'smallbase'  

// Optional: Change storage location (default: './db/')
sb.setPath('./data/') 

// Create
sb.create('users' {name: 'Bob', age: 42})

// Find
sb.find('users', {name: 'Bob'})

// Find all 
sb.findAll('users', {age: 42})

// Fetch all items
const users = sb.fetch('users')

// Fetch 10 items from second  
const someUsers = sb.fetch('users', 2, 10)

// Update 
sb.update('users', {name: 'Bob', age: 52})

// Delete 
sb.delete('users', {name: 'Bob'})

// Erase one collection
sb.erase('users')

// Erase all collections
sb.erase()
```


## Test

```javascript
import sb from 'smallbase'  

// Create, update and check if it works 
try {
    sb.create('users', { name: 'Bob', age: 42 })
    const newAge = 52
    sb.update('users', {name: 'Bob', age: newAge})
    const user = sb.find('users', {name: 'Bob'})
    // should display true 
    console.log(user.age == newAge)
}catch(e){
    console.error(e)
}
```













