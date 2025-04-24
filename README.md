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
npm install smallbase
```


## Code

```javascript
import Smallbase from 'smallbase'  

// Optional: Change storage location (default: './db/')
Smallbase.setPath('./data/') 

// Test create and find
try {
    const newUser = Smallbase.create('users', { name: 'Bob', age: 42 })
    const existingUser = Smallbase.find('users', { name: 'Bob' })
    console.log(existingUser.age == newUser.age)
}catch(e){
    console.error(e)
}

// Read  
const users = Smallbase.fetch('users')

// Update 
Smallbase.update('users', {name: 'Bob', age: 52})

// Delete 
Smallbase.delete('users', {name: 'Bob'})

// Erase
Smallbase.erase('users')
```









