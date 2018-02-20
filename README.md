# reacting-calendar
Date-Picker in ReactJS

## Table of Contents

- [NVM Install](#nvm-install)
- [Project Setup](#project-setup)
- [Run Tests](#run-tests)

## Commands:

## NVM Install
```
git clone https://github.com/creationix/nvm.git ~/.nvm
cd ~/.nvm
git checkout v0.33.2
cd ~
echo 'source ~/.nvm/nvm.sh' >> ~/.bashrc
echo 'export PATH="./node_modules/.bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
nvm install node
echo "8.2.1" > ~/.nvmrc
```

## Project Setup
```
git clone git@github.com:drylogics/reacting-calendar.git
cd reacting-calendar/
nvm install 8.2.1
nvm use 8.2.1
npm install -g npm@latest
npm install
npm start
```

## Run Tests
```
npm test
```
