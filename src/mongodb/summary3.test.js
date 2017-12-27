import { computeSummary, PLATFORM, MULTIPLY } from "./answer"

const _ = console.log

const TEST_CASE = "Compute summary, not all platforms choosen"

const ansArr1 = [
  {
    questionTxt: "Does your app retrieve content from the cloud or servers?",
    questionId: "5a0d54ec03bf4b8847605680",
    answers: [
      {
        text: "yes",
        img_url: "http://localhost/howmuch/images/mountain-300x300.png",
        pay: 5000,
        fixed_pay: 3000
      },
      {
        text: "no",
        img_url: "http://localhost/howmuch/images/no-300x300.png",
        pay: 3000,
        fixed_pay: 0
      }
    ],
    order: 8,
    answerTxt: "yes",
    img_url: "http://localhost/howmuch/images/mountain-300x300.png",
    pay: 5000,
    fixed_pay: 3000
  },
  {
    questionTxt: "Do you need a dashboard for administration and reports?",
    questionId: "5a0d54ec03bf4b8847605686",
    answers: [
      {
        text: "Off-the-shelf O.US Dashboard",
        img_url: "http://localhost/howmuch/images/console-300x300.png",
        pay: 0,
        fixed_pay: 5000
      },
      {
        text: "Custom Built Dashboard",
        img_url: "http://by.originally.us/howmuch/images/magic-300x300.png",
        pay: 0,
        fixed_pay: 12000
      }
    ],
    order: 14,
    answerTxt: "Off-the-shelf O.US Dashboard",
    img_url: "http://localhost/howmuch/images/console-300x300.png",
    pay: 0,
    fixed_pay: 5000
  },
  {
    questionTxt: "Do you need us to supply app designs and plan the user experiences (UX)?",
    questionId: "5a0d54ec03bf4b884760567e",
    answers: [
      {
        text: "Yes",
        img_url: "http://localhost/howmuch/images/brush-300x300.png",
        pay: 6000,
        fixed_pay: 3000
      },
      {
        text: "No",
        img_url: "http://localhost/howmuch/images/no-300x300.png",
        pay: 3000,
        fixed_pay: 0
      }
    ],
    order: 6,
    answerTxt: "Yes",
    img_url: "http://localhost/howmuch/images/brush-300x300.png",
    pay: 6000,
    fixed_pay: 3000
  },
  {
    fixed_pay: 0,
    pay: 2000,
    img_url: "http://localhost/howmuch/images/suit-up-300x300.png",
    answerTxt: "Facebook Connect & Email Signups",
    order: 7,
    answers: [
      {
        fixed_pay: 0,
        pay: 2000,
        img_url: "http://localhost/howmuch/images/suit-up-300x300.png",
        text: "Facebook Connect & Email Signups"
      },
      {
        fixed_pay: 0,
        pay: 1500,
        img_url: "http://localhost/howmuch/images/like-300x300.png",
        text: "Facebook Connect Only"
      },
      {
        fixed_pay: 0,
        pay: 1500,
        img_url: "http://localhost/howmuch/images/document-300x300.png",
        text: "Email Signups & Logins Only"
      },
      {
        fixed_pay: 0,
        pay: 0,
        img_url: "http://localhost/howmuch/images/like-300x300.png",
        text: "No User Signups & Logins"
      }
    ],
    questionId: "5a0d54ec03bf4b884760567f",
    questionTxt: "Is there a login and signup mechanism for users?"
  },
  {
    questionTxt: "Is there going to be payments within your app?",
    questionId: "5a0d54ec03bf4b8847605684",
    answers: [
      {
        text: "yes",
        img_url: "http://localhost/howmuch/images/piggy-bank-300x300.png",
        pay: 2500,
        fixed_pay: 5000
      },
      {
        text: "no",
        img_url: "http://localhost/howmuch/images/no-300x300.png",
        pay: 0,
        fixed_pay: 0
      }
    ],
    order: 12,
    answerTxt: "yes",
    img_url: "http://localhost/howmuch/images/piggy-bank-300x300.png",
    pay: 2500,
    fixed_pay: 5000
  },
  {
    questionTxt: "Do you need to send push notifications to your app users?",
    questionId: "5a0d54ec03bf4b8847605682",
    answers: [
      {
        text: "yes",
        img_url: "http://localhost/howmuch/images/paper-airplane-300x300.png",
        pay: 1000,
        fixed_pay: 1500
      },
      {
        text: "no",
        img_url: "http://localhost/howmuch/images/no-300x300.png",
        pay: 0,
        fixed_pay: 0
      }
    ],
    order: 10,
    answerTxt: "yes",
    img_url: "http://localhost/howmuch/images/paper-airplane-300x300.png",
    pay: 1000,
    fixed_pay: 1500
  },
  {
    fixed_pay: 2000,
    pay: 0,
    img_url: "http://localhost/howmuch/images/letter-300x300.png",
    answerTxt: "yes",
    order: 9,
    answers: [
      {
        fixed_pay: 2000,
        pay: 0,
        img_url: "http://localhost/howmuch/images/letter-300x300.png",
        text: "yes"
      },
      {
        fixed_pay: 0,
        pay: 0,
        img_url: "http://localhost/howmuch/images/no-300x300.png",
        text: "no"
      }
    ],
    questionId: "5a0d54ec03bf4b8847605681",
    questionTxt: "Do you need to automatically send SMSes to users? (For One-Time-Pins, alerts, etc)"
  },
  {
    fixed_pay: 1500,
    pay: 1500,
    img_url: "http://localhost/howmuch/images/map-300x300.png",
    answerTxt: "yes",
    order: 13,
    answers: [
      {
        fixed_pay: 1500,
        pay: 1500,
        img_url: "http://localhost/howmuch/images/map-300x300.png",
        text: "yes"
      },
      {
        fixed_pay: 0,
        pay: 0,
        img_url: "http://localhost/howmuch/images/no-300x300.png",
        text: "no"
      }
    ],
    questionId: "5a0d54ec03bf4b8847605685",
    questionTxt: "Do you need to track your users' locations or use maps?"
  },
  {
    fixed_pay: 1500,
    pay: 0,
    img_url: "http://localhost/howmuch/images/mailbox-300x300.png",
    answerTxt: "yes",
    order: 11,
    answers: [
      {
        fixed_pay: 1500,
        pay: 0,
        img_url: "http://localhost/howmuch/images/mailbox-300x300.png",
        text: "yes"
      },
      {
        fixed_pay: 0,
        pay: 0,
        img_url: "http://localhost/howmuch/images/no-300x300.png",
        text: "no"
      }
    ],
    questionId: "5a0d54ec03bf4b8847605683",
    questionTxt: "Do you need to automatically send email to users? (Welcome emails, account verification emails, etc)"
  },
  {
    fixed_pay: 3000,
    pay: 0,
    img_url: "http://by.originally.us/howmuch/images/brain-300x300.png",
    answerTxt: "Somewhat",
    order: 5,
    answers: [
      {
        fixed_pay: 5000,
        pay: 800,
        img_url: "http://by.originally.us/howmuch/images/box-300x300.png",
        text: "Not Yet"
      },
      {
        fixed_pay: 3000,
        pay: 0,
        img_url: "http://by.originally.us/howmuch/images/brain-300x300.png",
        text: "Somewhat"
      },
      {
        fixed_pay: 1000,
        pay: 0,
        img_url: "http://by.originally.us/howmuch/images/bulb-300x300.png",
        text: "I have everything"
      }
    ],
    questionId: "5a0d54ec03bf4b884760567d",
    questionTxt: "Do you have detailed drawings and plans on how each screen on your app will work?"
  },
  {
    questionTxt: "Do you need us to design a logo for your app?",
    questionId: "5a0d54ec03bf4b884760567c",
    answers: [
      {
        text: "Yes",
        img_url: "http://by.originally.us/howmuch/images/pen-300x300.png",
        pay: 0,
        fixed_pay: 800
      },
      {
        text: "No",
        img_url: "http://by.originally.us/howmuch/images/no-300x300.png",
        pay: 0,
        fixed_pay: 0
      }
    ],
    order: 4,
    answerTxt: "Yes",
    img_url: "http://by.originally.us/howmuch/images/pen-300x300.png",
    pay: 0,
    fixed_pay: 800
  },
  {
    multiply: {
      android: 1,
      ios: 1
    },
    type: "MULTIPLY",
    img_url: "http://by.originally.us/howmuch/images/no-300x300.png",
    answerTxt: "No",
    order: 3,
    answers: [
      {
        multiply: {
          ios: 1.6
        },
        type: "MULTIPLY",
        img_url: "http://by.originally.us/howmuch/images/ipad-300x300.png",
        text: "iPads"
      },
      {
        multiply: {
          android: 1.6
        },
        type: "MULTIPLY",
        img_url: "http://by.originally.us/howmuch/images/graph-300x300.png",
        text: "Android tablets"
      },
      {
        multiply: {
          android: 1.6,
          ios: 1.6
        },
        type: "MULTIPLY",
        img_url: "http://by.originally.us/howmuch/images/baloons-300x300.png",
        text: "Both"
      },
      {
        multiply: {
          android: 1,
          ios: 1
        },
        type: "MULTIPLY",
        img_url: "http://by.originally.us/howmuch/images/no-300x300.png",
        text: "No"
      }
    ],
    questionId: "5a0d54ec03bf4b884760567b",
    questionTxt: "Need a version for tablets?"
  },
  {
    questionTxt: "Do you wish to build for web?",
    questionId: "5a0d54ec03bf4b884760567a",
    answers: [
      {
        text: "yes",
        img_url: "http://by.originally.us/howmuch/images/browser-300x300.png",
        type: "PLATFORM",
        multiply: {
          web: 1
        }
      },
      {
        text: "no",
        img_url: "http://by.originally.us/howmuch/images/no-300x300.png",
        type: "PLATFORM",
        multiply: {
          web: 0
        }
      }
    ],
    order: 2,
    answerTxt: "no",
    img_url: "http://by.originally.us/howmuch/images/no-300x300.png",
    type: "PLATFORM",
    multiply: {
      web: 0
    }
  },
  {
    multiply: {
      android: 1,
      ios: 1
    },
    type: "PLATFORM",
    img_url: "http://by.originally.us/howmuch/images/baloons-300x300.png",
    answerTxt: "both",
    order: 1,
    answers: [
      {
        multiply: {
          ios: 1
        },
        type: "PLATFORM",
        img_url: "http://by.originally.us/howmuch/images/iphone-300x300.png",
        text: "ios"
      },
      {
        multiply: {
          android: 1
        },
        type: "PLATFORM",
        img_url: "http://by.originally.us/howmuch/images/android-300x300.png",
        text: "android"
      },
      {
        multiply: {
          android: 1,
          ios: 1
        },
        type: "PLATFORM",
        img_url: "http://by.originally.us/howmuch/images/baloons-300x300.png",
        text: "both"
      }
    ],
    questionId: "5a0d54ec03bf4b8847605679",
    questionTxt: "Which platforms do you wish to build for?"
  }
]

const expectedMultiplyTotal = 2
const expectedSummary = 62300

const summary = computeSummary(ansArr1)

const pass = expectedSummary === summary

_("summary", summary)

pass ? _(`\x1b[42m[PASS]\x1b[0m ${TEST_CASE}`) : _(`\x1b[41m[FAIL]\x1b[0m ${TEST_CASE}`)
