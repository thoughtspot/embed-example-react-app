// TODO -  Get the username and password from the user (optional)
export const constants = {

  tsURL: "{myts}.thoughtspot.cloud",
  username: "",
  password: "",

  // App features
  appIcon: true,
  leftSideMenuEnabled: false,
  leftSideMenuRestApi: false,
  selectedItemDrawerEnabled: false,

  appTopTitle: "My App",
  appTopIconUrl: "/images/ts.png",

  primaryColorCode: "rgb(0, 0 , 0)",
  secondaryColorCode: "rgb(255, 255, 255)",

  // Component Names
  liveboardName: "Dashboard",
  answerName: "Report",
  spotterName: "Data Chat"

};

// CSS files to choose from.  These are pointing to files hosted on GitHub via jsDelivr.
export const cssFiles = {
  default:
    "https://cdn.jsdelivr.net/gh/thoughtspot/tse-advanced-tutorial/css/default.css",
  dark: "https://cdn.jsdelivr.net/gh/thoughtspot/tse-advanced-tutorial/css/dark.css",
};
