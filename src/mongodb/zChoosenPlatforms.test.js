import { choosenPlatforms } from "./answer"

const _ = console.log

const TEST_CASE = "Choosen Platforms"

const ansArr1 = [
  {
    multiply: {
      ios: 1
    },
    type: "PLATFORM",
    img_url: "http://by.originally.us/howmuch/images/iphone-300x300.png",
    title: "Create IOS App",
    answerTxt: "ios",
    answers: [
      {
        multiply: {
          ios: 1
        },
        type: "PLATFORM",
        img_url: "http://by.originally.us/howmuch/images/iphone-300x300.png",
        title: "Create IOS App",
        text: "ios"
      },
      {
        multiply: {
          android: 1
        },
        type: "PLATFORM",
        img_url: "http://by.originally.us/howmuch/images/android-300x300.png",
        title: "Create Android App",
        text: "android"
      },
      {
        multiply: {
          android: 1,
          ios: 1
        },
        type: "PLATFORM",
        img_url: "http://by.originally.us/howmuch/images/baloons-300x300.png",
        title: "Create IOS & Android App",
        text: "both"
      },
      {
        multiply: {
          android: 0,
          ios: 0
        },
        type: "PLATFORM",
        img_url: "http://by.originally.us/howmuch/images/no-300x300.png",
        text: "No"
      }
    ],
    order: 1,
    questionTxt: "Which mobile platforms do you wish to build for?",
    questionId: "5a1392c60b0f8d3f0571ea9c"
  },
  {
    questionId: "5a1392c60b0f8d3f0571ea9d",
    questionTxt: "Do you want to build for web?",
    order: 2,
    answers: [
      {
        text: "Yes",
        title: "Create Web App",
        img_url: "http://by.originally.us/howmuch/images/browser-300x300.png",
        type: "PLATFORM",
        multiply: {
          web: 1
        }
      },
      {
        text: "No",
        img_url: "http://by.originally.us/howmuch/images/no-300x300.png",
        type: "PLATFORM",
        multiply: {
          web: 0
        }
      }
    ],
    answerTxt: "Yes",
    title: "Create Web App",
    img_url: "http://by.originally.us/howmuch/images/browser-300x300.png",
    type: "PLATFORM",
    multiply: {
      web: 1
    }
  }
]

const expectedPlatforms = { ios: 1, android: 0, web: 1 }

const platforms = choosenPlatforms(ansArr1)
const { ios, android, web } = platforms

const pass = expectedPlatforms.ios === ios && expectedPlatforms.android === android && expectedPlatforms.web === web

_("platforms", platforms)

pass ? _(`\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`) : _(`\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`)
