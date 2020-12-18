# Tipomobi


## Stack

This project has been generated by Ignite CLI and uses the Bowser boilerplate as a base.

- React Native
- React Navigation
- MobX State Tree
- TypeScript

## Quick Start

1. Configure env config files. See [config](#config).
    - You must request map API keys from [Steerpath](https://www.steerpath.com/), app won't work without them.
2. `yarn install` 
    - If you get "CocoaPods could not find compatible versions..." run
        -  `cd ios/` then `pod update` then `cd ..` and `yarn install` again.
5. Android platform settings. See [android](#android) section.
4. See [package.json](./package.json) scripts for available commands.
    - `yarn ios` to run app in ios emulator or physical device. 
    - `yarn android` to run app in android emulator or physical device. 

## ./app directory

The inside of the src directory looks similar to the following:

```
app
│── components
│── i18n
├── models
├── navigation
├── screens
├── services
├── theme
├── utils
└── app.tsx
```

## Config
Navigate under `./app/config/`

Create file `env.dev.js` with following content
```js
import RNFS from "react-native-fs"
module.exports = {
  API_URL: "https://example.com",
  API_KEY: "<content>",
  META_API_KEY: "<content>",
  CONFIG_FILE_PATH: RNFS.DocumentDirectoryPath + "/steerpath_config.json",
  TAXI_PHONE_NUMBER: "<content>",
  TAXI_SMS_NUMBER: "<content>",
  TAXI_FEEDBACK_URL: "<content>",
  EMAIL_USER_ID: "<content>",
  URL_PRIVACY_POLICY: "<content>",
  URL_ACCESSIBILITY_STATEMENT_FI: "<content>",
  URL_ACCESSIBILITY_STATEMENT_EN: "<content>",
}
```
You need to ask `API_KEY`, `META_API_KEY` from [Steerpath](https://www.steerpath.com/).



Create file `env.prod.js` with following content
```js
import RNFS from "react-native-fs"
module.exports = {
  API_URL: "https://example.com",
  API_KEY: "<content>",
  META_API_KEY: "<content>",
  CONFIG_FILE_PATH: RNFS.DocumentDirectoryPath + "/steerpath_config.json",
  TAXI_PHONE_NUMBER: "<content>",
  TAXI_SMS_NUMBER: "<content>",
  TAXI_FEEDBACK_URL: "<content>",
  EMAIL_USER_ID: "<content>",
  URL_PRIVACY_POLICY: "<content>",
  URL_ACCESSIBILITY_STATEMENT_FI: "<content>",
  URL_ACCESSIBILITY_STATEMENT_EN: "<content>",
}
```
You need to ask `API_KEY`, `META_API_KEY` from [Steerpath](https://www.steerpath.com/).


Create file `steerpath.json` with following content
```json
{
  "services": {
    "settings": {
      "default": {
        "enabled": true,
        "externalLinks": []
      },
      "web": {
        "enabled": true,
        "settingsButtons": [
          {
            "title": "sp_set_user_location_title",
            "description": "sp_set_user_location_description",
            "action": {
              "type": "set_user_location"
            },
            "type": "button"
          },
          {
            "title": "sp_set_dark_style_title",
            "description": "sp_set_dark_style_description",
            "action": {
              "type": "set_dark_style"
            },
            "type": "button"
          },
          {
            "title": "sp_set_default_style_title",
            "description": "sp_set_default_style_description",
            "action": {
              "type": "set_default_style"
            },
            "type": "button"
          }
        ],
        "externalLinks": [
          {
            "title": "sp_send_feedback_title",
            "link": "support@steerpath.com",
            "type": "email"
          },
          {
            "title": "sp_visit_website_title",
            "link": "https://steerpath.com",
            "type": "web"
          }
        ]
      }
    },
    "smartmap": {
      "default": {
        "defaultTheme": "default",
        "supportedThemes": [
            "default",
            "dark"
        ],
        "useFloorBasedStyle": true,
        "enableExtrusion": true,
        "enableExtrusionAntialiasing": false,
        "nonSelectableTags": [
            "hidden"
        ],
        "nonSelectableCssClasses": [
            "text_large",
            "text_medium",
            "text_small",
            "service_direction",
            "category_other",
            "infrastructure_hole",
            "category_cover_poi",
            "infrastructure_wing",
            "wing",
            "infrastructure_department",
            "department",
            "infrastructure_department_sticky",
            "department_sticky"
        ],
        "mapDataURL": "https://mapdata.eu.steerpath.net/",
        "bluedot": {
          "indoor": true,
          "outdoor": false
        },
        "routeDataURL": "https://routes.eu.steerpath.net/",
        "navigationDestinationThresholdM": 5,
        "navigationRerouteThresholdM": 5,
        "mapStylePath": "/style/default.json",
        "urlServiceURL": "https://url.eu.steerpath.net/",
        "viewProperties": {
          "bearing": -2.4,
          "pitch": 0,
          "layerIndex": 2,
          "buildingRef": "431",
          "bounds": {
            "sw": {
              "lng": 24.812049873812953,
              "lat": 60.22079674581377
            },
            "ne": {
              "lng": 24.812706546050777,
              "lat": 60.221077322610995
            }
          }
        }
      }
    },
    "search": {
      "default": {
        "nonSearchableCssClasses": [
          "text_large",
          "text_medium",
          "text_small",
          "service_direction",
          "category_other",
          "infrastructure_hole",
          "category_cover_poi"
      ],
        "searchSuggestions": [
          {
            "title": "sp_show_free_desk_title",
            "shortTitle": "sp_show_free_desk_title_short",
            "description": "sp_show_free_desk_description",
            "iconName": "service_desk_free",
            "action": {
              "type": "show_free_live_rooms",
              "allTags": [
                "service_desk"
              ]
            }
          },
          {
            "title": "sp_show_free_phone_booths_title",
            "shortTitle": "sp_show_free_phone_booths_title_short",
            "description": "sp_show_free_phone_booths_description",
            "iconName": "service_phone_free",
            "action": {
              "type": "show_free_live_rooms",
              "allTags": [
                "service_phone"
              ]
            }
          },
          {
            "title": "sp_show_free_rooms_title",
            "shortTitle": "sp_show_free_rooms_title_short",
            "description": "sp_show_free_rooms_description",
            "iconName": "category_meeting_room_free",
            "action": {
              "type": "show_free_live_rooms",
              "anyTags": [
                "room",
                "category_room"
              ]
            }
          },
          {
            "title": "sp_category_meeting_room_title",
            "shortTitle": "sp_category_meeting_room_title_short",
            "description": "sp_category_meeting_room_description",
            "iconName": "category_meeting_room",
            "action": {
              "type": "show_pois_with_tags",
              "allTags": [
                "category_meeting_room"
              ]
            }
          },
          {
            "title": "sp_service_toilet_title",
            "shortTitle": "sp_service_toilet_title_short",
            "description": "sp_service_toilet_description",
            "iconName": "service_toilet",
            "action": {
              "type": "show_pois_with_tags",
              "anyTags": [
                "service_toilet",
                "toilet"
              ]
            }
          }
        ],
        "moreSuggestionsButton": {
          "title": "sp_more_suggestions_title",
          "shortTitle": "sp_more_suggestions_title_short",
          "description": "sp_more_suggestions_description",
          "iconName": "category_more",
          "action": {
            "type": "show_more_categories"
          }
        }
      }
    },
    "kiosk": {
      "share": {
          "hash": false,
          "qrCodeShare": {
              "enabled": false,
              "qrCodeURL": "https://kiosk.steerpath.com/",
              "qrCodePath": "/default/index.html"
          },
          "copyLinkToClipboard": false
      },
      "analytics": {
          "enabled": false
      }
    },
    "telemetry": {
      "default": {
          "telemetryURL": "https://capture.eu.steerpath.net/v1/",
          "beacons": "known",
          "location": "indoor",
          "enabled": true,
          "locationIntervalS": 60,
          "transmissionIntervalS": 120
      },
      "web": {
          "enabled": false,
          "telemetryURL": "https://capture.eu.steerpath.net/v1/"
      }
  },
    "metadata": {
      "default": {
        "metadataURL": "https://meta2.eu.steerpath.net/meta/v2/"
      }
    },
    "offline": {
      "default": {
        "offlineDataURL": "https://offline.eu.steerpath.net/"
      }
    },
    "live": {
      "default": {
        "liveURL": "https://live3.eu.steerpath.net/",
        "liveApiKey": "<live-api-key>",
        "enabled": true
      },
      "web": {
        "enabled": true,
        "liveApiKey": "<live-api-key>",
        "liveURL": "https://live3.eu.steerpath.net/sdk-data"
      }
    },
    "positioning": {
      "default": {
          "beaconsURL": "https://beacons2.eu.steerpath.net/",
          "nddURL": "https://ndd.eu.steerpath.net/",
          "eidURL": "https://eidupdates.eu.steerpath.net/",
          "useAccelerometer": true,
          "useGyro": false,
          "useCompass": true,
          "gpsThresholdM": 10,
          "eidUpdatesEnabled": true
      },
      "ios": {
          "useCompass": true
      }
  },
    "ui": {
      "default": {
        "colors": {
          "primaryColor": "#857CE8",
          "secondaryColor": "#857CE8",
          "bluedotColor": "#3887be",
          "backgroundColor": "#fafafa",
          "zoomedInRouteLineColor": "#01b2a5",
          "zoomedOutRouteLineColor": "#d7b127",
          "altRouteLineColor": "#DEC56B",
          "backgroundColorLayout": "rgba(255, 255, 255, 0.6)",
          "backgroundColorItem": "#fafafa",
          "textColor": "#000",
          "textHaloColor": "#fff"
        },
        "colors_dark": {
          "primaryColor": "#272b3f",
          "bluedotColor": "#3a5e78",
          "backgroundColor": "#fafafa",
          "zoomedInRouteLineColor": "#3a7874",
          "zoomedOutRouteLineColor": "#d7b127",
          "altRouteLineColor": "#DEC56B",
          "backgroundColorLayout": "rgba(0, 0, 0, 0.9)",
          "backgroundColorItem": "#333333",
          "textColor": "#fff",
          "textHaloColor": "#000"
        }
      }
    }
  },
  "update": false
}
```
This is example json configuration without API keys. You need to ask api keys from [Steerpath](https://www.steerpath.com/).



## Android
Navigate to `./android/` and create `local.properties` file.  
Paste following contents in and edit path.

```local.properties
sdk.dir=/Users/user.name/Library/Android/sdk
```

-----------------------------------

**components**
This is where your React components will live. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components. The app will come with some commonly used components like Button.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigation**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truely shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application. This is also where you will specify whether you want to run the app in storybook mode.

### ./ignite directory

The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find generators, plugins and examples to help you get started with React Native.

### ./storybook directory

This is where your stories will be registered and where the Storybook configs will live

### ./test directory

This directory will hold your Jest configs and mocks, as well as your [storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) test file. This is a file that contains the snapshots of all your component storybooks.

## Running Storybook

From the command line in your generated app's root directory, enter `yarn run storybook`
This starts up the storybook server.

In `index.js`, change `SHOW_STORYBOOK` to `true` and reload the app.

For Visual Studio Code users, there is a handy extension that makes it easy to load Storybook use cases into a running emulator via tapping on items in the editor sidebar. Install the `React Native Storybook` extension by `Orta`, hit `cmd + shift + P` and select "Reconnect Storybook to VSCode". Expand the STORYBOOK section in the sidebar to see all use cases for components that have `.story.tsx` files in their directories.
