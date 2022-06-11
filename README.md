# Motivation

The purpose of this project is to provide a simple and easy to way to priorioty tabs that has some changes can represent page notifications especialy when user has many comunication pages like slack, discord, etc.

When some metadata of tab is changed, the tab will be moved to the top of the list. So you easily can see the important tab =)

## TODO

- Make settings pages
- Create way to specific what tabs you want to see
- Create way to diferentiate tabs name when it's the same domain for diferente users

## How to build

### Requirements my environment

- node v16.14.2
- npm v8.5.0
- OS: Ubuntu 20.04 LTS

### Comand to build application

First you need to install the dependencies:

```bash
npm install
```

Then you can build the project for production enverioment:

```bash
npm run build
```

If you want a hot reload, you can run the server with mocked value:

```bash
npm run start
```

The build will create a folder called `dist` in the root of the project. So, you can load the project in your browser

https://addons.mozilla.org/en-US/developers/addon/submit/upload-listed
https://extensionworkshop.com/documentation/publish/submitting-an-add-on/
