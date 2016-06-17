function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId5() {
        $.__views.wrapper.removeEventListener("open", __alloyId5);
        if ($.__views.wrapper.activity) $.__views.wrapper.activity.onCreateOptionsMenu = function(e) {
            $.__views.searchBar = Ti.UI.Android.createSearchView({
                height: 40,
                left: 10,
                width: "76%",
                id: "searchBar"
            });
            onSearchChange ? $.addListener($.__views.searchBar, "change", onSearchChange) : __defers["$.__views.searchBar!change!onSearchChange"] = true;
            $.searchBar = $.__views.searchBar;
            var __alloyId3 = {
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
                title: "Search",
                icon: Ti.Android.R.drawable.ic_menu_search,
                id: "__alloyId1"
            };
            $.__views.searchBar && (__alloyId3.actionView = $.__views.searchBar);
            $.__views.__alloyId1 = e.menu.add(_.pick(__alloyId3, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId1.applyProperties(_.omit(__alloyId3, Alloy.Android.menuItemCreateArgs));
            $.__alloyId1 = $.__views.__alloyId1;
            var __alloyId4 = {
                id: "bookmarkBtn",
                title: "Bookmarks",
                icon: "/images/ic_action_action_bookmark.png",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
            };
            $.__views.bookmarkBtn = e.menu.add(_.pick(__alloyId4, Alloy.Android.menuItemCreateArgs));
            $.__views.bookmarkBtn.applyProperties(_.omit(__alloyId4, Alloy.Android.menuItemCreateArgs));
            $.bookmarkBtn = $.__views.bookmarkBtn;
            onBookmarkClick ? $.addListener($.__views.bookmarkBtn, "click", onBookmarkClick) : __defers["$.__views.bookmarkBtn!click!onBookmarkClick"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function init() {
        var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "userData/data.json");
        users = JSON.parse(file.read().text).users;
        users = _.sortBy(users, function(user) {
            return user.lastName;
        });
        if (users) {
            indexes = [];
            var sections = [];
            var userGroups = _.groupBy(users, function(item) {
                return item.lastName.charAt(0);
            });
            _.each(userGroups, function(group) {
                var dataToAdd = preprocessForListView(group);
                if (dataToAdd.length < 1) return;
                indexes.push({
                    index: indexes.length,
                    title: group[0].lastName.charAt(0)
                });
                var sectionHeader = Ti.UI.createView({
                    backgroundColor: "#ececec",
                    width: Ti.UI.FILL,
                    height: 30
                });
                var sectionLabel = Ti.UI.createLabel({
                    text: group[0].lastName.charAt(0),
                    left: 20,
                    font: {
                        fontSize: 20
                    },
                    color: "#666"
                });
                sectionHeader.add(sectionLabel);
                var section = Ti.UI.createListSection({
                    headerView: sectionHeader
                });
                section.items = dataToAdd;
                sections.push(section);
            });
            $.listView.sections = sections;
        }
        _args.title && ($.wrapper.title = _args.title);
        _args.restrictToFavorites && false;
    }
    function onItemClick(e) {
        Ti.Analytics.featureEvent("android." + title + ".contact.clicked");
        var item = $.listView.sections[e.sectionIndex].items[e.itemIndex];
        Alloy.Globals.Navigator.open("profile", item.properties.user);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "directory";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.wrapper = Ti.UI.createWindow({
        backgroundColor: "#fff",
        titleAttributes: {
            color: "#C41230"
        },
        modal: false,
        navBarHidden: true,
        fullscreen: true,
        layout: "vertical",
        id: "wrapper",
        title: "Directory"
    });
    $.__views.wrapper && $.addTopLevelView($.__views.wrapper);
    $.__views.wrapper.addEventListener("open", __alloyId5);
    var __alloyId6 = {};
    var __alloyId8 = [];
    var __alloyId10 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId11 = [];
            var __alloyId12 = {
                type: "Ti.UI.ImageView",
                bindId: "userPhoto",
                properties: {
                    preventDefaultImage: true,
                    borderWidth: 1,
                    borderColor: "#acacac",
                    height: 75,
                    width: 75,
                    top: 12,
                    left: 0,
                    borderRadius: 35,
                    defaultImage: "/images/default_profile_image.jpg",
                    bindId: "userPhoto"
                }
            };
            __alloyId11.push(__alloyId12);
            var __alloyId14 = {
                type: "Ti.UI.View",
                properties: {
                    borderWidth: 1.5,
                    borderColor: "#acacac",
                    height: 75,
                    width: 75,
                    top: 12,
                    left: 0,
                    borderRadius: 35,
                    opacity: .6
                }
            };
            __alloyId11.push(__alloyId14);
            var __alloyId16 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId17 = [];
                    var __alloyId18 = {
                        type: "Ti.UI.Label",
                        bindId: "userName",
                        properties: {
                            color: "#444",
                            font: {
                                fontSize: 14
                            },
                            left: 85,
                            bindId: "userName"
                        }
                    };
                    __alloyId17.push(__alloyId18);
                    var __alloyId19 = {
                        type: "Ti.UI.Label",
                        bindId: "userEmail",
                        properties: {
                            color: "#666",
                            font: {
                                fontSize: 10
                            },
                            left: 85,
                            height: 20,
                            bindId: "userEmail"
                        }
                    };
                    __alloyId17.push(__alloyId19);
                    var __alloyId20 = {
                        type: "Ti.UI.Label",
                        bindId: "userCompany",
                        properties: {
                            color: "#666",
                            font: {
                                fontSize: 10
                            },
                            left: 85,
                            height: 20,
                            bindId: "userCompany"
                        }
                    };
                    __alloyId17.push(__alloyId20);
                    return __alloyId17;
                }(),
                properties: {
                    layout: "vertical",
                    height: Ti.UI.SIZE,
                    width: Ti.UI.SIZE,
                    left: 0
                }
            };
            __alloyId11.push(__alloyId16);
            var __alloyId22 = {
                type: "Ti.UI.View",
                properties: {
                    bottom: 0,
                    backgroundColor: "#ececec",
                    width: Ti.UI.FILL,
                    height: 1
                }
            };
            __alloyId11.push(__alloyId22);
            return __alloyId11;
        }(),
        properties: {
            left: 10
        }
    };
    __alloyId8.push(__alloyId10);
    var __alloyId7 = {
        properties: {
            height: 100,
            width: Ti.UI.FILL,
            name: "userTemplate"
        },
        childTemplates: __alloyId8
    };
    __alloyId6["userTemplate"] = __alloyId7;
    var __alloyId24 = [];
    var __alloyId26 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId27 = [];
            var __alloyId28 = {
                type: "Ti.UI.ImageView",
                bindId: "userPhoto",
                properties: {
                    preventDefaultImage: true,
                    borderWidth: 1,
                    borderColor: "#acacac",
                    height: 75,
                    width: 75,
                    top: 12,
                    left: 0,
                    borderRadius: 35,
                    defaultImage: "/images/default_profile_image.jpg",
                    bindId: "userPhoto"
                }
            };
            __alloyId27.push(__alloyId28);
            var __alloyId30 = {
                type: "Ti.UI.View",
                properties: {
                    borderWidth: 1.5,
                    borderColor: "#acacac",
                    height: 75,
                    width: 75,
                    top: 12,
                    left: 0,
                    borderRadius: 35,
                    opacity: .6
                }
            };
            __alloyId27.push(__alloyId30);
            var __alloyId32 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId33 = [];
                    var __alloyId34 = {
                        type: "Ti.UI.Label",
                        bindId: "userName",
                        properties: {
                            color: "#444",
                            font: {
                                fontSize: 14
                            },
                            left: 85,
                            bindId: "userName"
                        }
                    };
                    __alloyId33.push(__alloyId34);
                    var __alloyId35 = {
                        type: "Ti.UI.Label",
                        bindId: "userEmail",
                        properties: {
                            color: "#666",
                            font: {
                                fontSize: 10
                            },
                            left: 85,
                            height: 20,
                            bindId: "userEmail"
                        }
                    };
                    __alloyId33.push(__alloyId35);
                    var __alloyId36 = {
                        type: "Ti.UI.Label",
                        bindId: "userCompany",
                        properties: {
                            color: "#666",
                            font: {
                                fontSize: 10
                            },
                            left: 85,
                            height: 20,
                            bindId: "userCompany"
                        }
                    };
                    __alloyId33.push(__alloyId36);
                    return __alloyId33;
                }(),
                properties: {
                    layout: "vertical",
                    height: Ti.UI.SIZE,
                    width: Ti.UI.SIZE,
                    left: 0
                }
            };
            __alloyId27.push(__alloyId32);
            var __alloyId38 = {
                type: "Ti.UI.Label",
                properties: {
                    color: "#038BC8",
                    font: {
                        fontSize: 25,
                        fontFamily: "icomoon"
                    },
                    text: "",
                    right: 10
                }
            };
            __alloyId27.push(__alloyId38);
            var __alloyId40 = {
                type: "Ti.UI.View",
                properties: {
                    bottom: 0,
                    backgroundColor: "#ececec",
                    width: Ti.UI.FILL,
                    height: 1
                }
            };
            __alloyId27.push(__alloyId40);
            return __alloyId27;
        }(),
        properties: {
            left: 10
        }
    };
    __alloyId24.push(__alloyId26);
    var __alloyId23 = {
        properties: {
            height: 100,
            width: Ti.UI.FILL,
            name: "favoriteTemplate"
        },
        childTemplates: __alloyId24
    };
    __alloyId6["favoriteTemplate"] = __alloyId23;
    $.__views.listView = Ti.UI.createListView({
        tintColor: "#666",
        backgroundColor: "#fff",
        templates: __alloyId6,
        id: "listView",
        defaultItemTemplate: "userTemplate"
    });
    $.__views.wrapper.add($.__views.listView);
    onItemClick ? $.addListener($.__views.listView, "itemclick", onItemClick) : __defers["$.__views.listView!itemclick!onItemClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var _args = arguments[0] || {}, $FM = (Alloy.Globals.App, require("favoritesmgr")), users = null, indexes = [];
    var title = _args.title ? _args.title.toLowerCase() : "directory";
    Ti.Analytics.featureEvent("android." + title + ".viewed");
    var preprocessForListView = function(rawData) {
        _args.restrictToFavorites && (rawData = _.filter(rawData, function(item) {
            return $FM.exists(item.id);
        }));
        return _.map(rawData, function(item) {
            var isFavorite = $FM.exists(item.id);
            return {
                template: isFavorite ? "favoriteTemplate" : "userTemplate",
                properties: {
                    searchableText: item.firstName + " " + item.lastName + " " + item.company + " " + item.email,
                    user: item,
                    editActions: [ {
                        title: isFavorite ? "- Favorite" : "+ Favorite",
                        color: isFavorite ? "#C41230" : "#038BC8"
                    } ],
                    canEdit: true
                },
                userName: {
                    text: item.firstName + " " + item.lastName
                },
                userCompany: {
                    text: item.company
                },
                userPhoto: {
                    image: item.photo
                },
                userEmail: {
                    text: item.email
                }
            };
        });
    };
    var onSearchChange;
    var onBookmarkClick = function() {
        Ti.Analytics.featureEvent("android." + title + ".favorites.clicked");
        Alloy.Globals.Navigator.open("directory", {
            restrictToFavorites: true,
            title: "Favorites",
            displayHomeAsUp: true
        });
    };
    onSearchChange = function(e) {
        $.listView.searchText = e.source.value;
    };
    $.wrapper.addEventListener("open", function() {
        if (true && _args.restrictToFavorites) {
            var activity = $.wrapper.getActivity();
            activity.onCreateOptionsMenu = function(e) {
                e.menu.clear();
            };
            activity.invalidateOptionsMenu();
        }
    });
    Ti.App.addEventListener("refresh-data", function() {
        init();
    });
    init();
    __defers["$.__views.searchBar!change!onSearchChange"] && $.addListener($.__views.searchBar, "change", onSearchChange);
    __defers["$.__views.bookmarkBtn!click!onBookmarkClick"] && $.addListener($.__views.bookmarkBtn, "click", onBookmarkClick);
    __defers["$.__views.listView!itemclick!onItemClick"] && $.addListener($.__views.listView, "itemclick", onItemClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;