[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/DhYPBlwE)

# Most used letter as first letter of first name

With this project, I aim to determine the most commonly used letter as the first letter of a first name, categorized by gender.

## Prerequisites

Before running this application, please make sure that you have the following softwares installed on your machine:

- **Docker Desktop:** If you don't have Docker Desktop installed, you can follow the installation instructions for your operating system:
  - [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
  - [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
  - [Docker Desktop for Linux](https://www.docker.com/products/docker-desktop)
  
- **Node.js and npm:** You can install Node.js and npm by following the instructions at [nodejs.org](https://nodejs.org/).

Please make sure Docker Desktop is running and you have Node.js and npm installed before proceeding with the instructions below.

## Getting started

To get started with this application, follow the steps below:

1. Clone this repository by using the following command in your terminal:
    ```bash
    git clone https://github.com/EHB-MCT/portfolio-second-chance-HiraTariqAkhtar.git
    ``` 

2. Navigate to the project directory
    ```bash
    cd portfolio-second-chance-HiraTariqAkhtar
    ```

3. Rename the ***dbConnection.js.example*** file located at ***build/images/api/src/helpers*** to ***dbConnection.js***.
   
4. Fill in the appropriate credentials for the values between '<>'
   
5. Rename the ***.env.example*** file located at ***build*** to ***.env***.
   
6. Fill in the appropriate credentials for the values between '<>'

7. Build and run the Docker container by using the following command in your terminal:
   ```bash
    cd build
    docker-compose up --build
    ```

If you encounter an error message stating *"Error: connect ECONNREFUSED"*, you can resolve it by restarting the application.
To do this, make a small change in any JavaScript file and then revert it back immediately. This will trigger a restart of the application and help resolve the connection issue.

The application is now succesfully started. You can acces it by navigating to 'localhost' or 'localhost:80' in your web browser.

### Using the application

Once the application is running, you can use it by following these steps:

1. Type your firstname in the form provided
2. Submit the form
3. You will be directed to a chart page where you can see the percentage of names with the same first letter as yours.
4. On the chart page, you will find a button to navigate back to the form and enter another name.

## Endpoints

```javascript

# returns 'form page'
GET(/)

# returns 'chart'
GET(/chart)

# update 'count' of your name's first letter in database
POST (/postName)

```

## License
[MIT](https://choosealicense.com/licenses/mit/)
