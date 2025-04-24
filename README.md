# Smallbase 

Local JSON database for consistents Node.js projects.
Execute your CRUD operations synchronously without external dependencies.


## Usage

When you create your first entry, it will create a new folder for your database (you choose the path). 
Then it will create a new json file per collection (col) to improve performance and organization. 

For every operation, as the first string argument, you need to specify the name of he collection (eg 'users').
The majority of operations need a second object argument to create or find an element. 
In this case, you only need one parameter (eg {name: 'Bob'}).


## Installation

```bash
npm install bason
```


## Code

```javascript
import Base from './Base.js'  // Adjust path as needed

// Optional: Change storage location (default: './db/')
Base.setPath('./data/') 

// Test create and find
try {
    const newUser = Base.create('users', { name: 'Bob', age: 42 })
    const existingUser = Base.find('users', { name: 'Bob' })
    console.log(existingUser.age == newUser.age)
}catch(e){
    console.error(e)
}

// Read  
const users = Base.fetch('users')

// Update 
Base.update('users', {name: 'Bob', age: 52})

// Delete 
Base.delete('users', {name: 'Bob'})

// Erase
Base.erase('users')
```









