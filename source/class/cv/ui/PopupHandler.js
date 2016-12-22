/* PopupHandler.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * Handles all popups
 * @class cv.ui.PopupHandler
 */
qx.Class.define('cv.ui.PopupHandler', {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    popups: {},

    init: function() {
      this.addPopup(new cv.ui.Popup("unknown"));
      this.addPopup(new cv.ui.Popup("info"));
      this.addPopup(new cv.ui.Popup("warning"));
      this.addPopup(new cv.ui.Popup("error"));
    },

    /**
     * Show a popup of type "type". The attributes is an type dependent object
     *
     * @param type {String} popup type
     * @param attributes {Map} popup configuration (content, title, stylings etc)
     * @return {cv.ui.Popup} The popup
     */
    showPopup: function (type, attributes) {
      var popup = this.getPopup(type);
      popup.create(attributes);
      return popup;
    },

    /**
     * Remove the popup.
     * @param popup {cv.ui.Popup} popup returned by showPopup()
     */
    removePopup: function (popup) {
      if (popup instanceof cv.ui.Popup) {
        popup.close();
      } else {
        qx.dom.Element.remove(popup);
      }
    },

    /**
     * Add a popup to the internal list
     * @param object {cv.ui.Popup} the popup
     */
    addPopup: function (object) {
      qx.core.Assert.assertInstance(object, cv.ui.Popup);
      this.popups[object.getType()] = object;
    },

    /**
     * Retrieve a popup by name
     * @param name {String} name of the popup
     * @return {Object}
     */
    getPopup: function(name) {
      var p = this.popups[name];
      if (p === undefined) {
        return this.popups.unknown;
      }
      return this.popups[name];
    },

    /**
     * Figure out best placement of popup.
     * A preference can optionally be passed. The position is that of the numbers
     * on the numeric keypad. I.e. a value of "6" means centered above the anchor.
     * A value of "0" means centered to the page
     *
     * @param anchor
     * @param popup
     * @param page
     * @param preference
     * @return {Map}
     */
    placementStrategy: function( anchor, popup, page, preference ) {
      var position_order = [8, 2, 6, 4, 9, 3, 7, 1, 5, 0];
      if (preference !== undefined) position_order.unshift(preference);

      for (var pos in position_order) {
        var xy = {};
        switch (position_order[pos]) {
          case 0: // page center - will allways work
            return {x: (page.w - popup.w) / 2, y: (page.h - popup.h) / 2};

          case 1:
            xy.x = anchor.x - popup.w;
            xy.y = anchor.y + anchor.h;
            break;

          case 2:
            xy.x = anchor.x + anchor.w / 2 - popup.w / 2;
            xy.y = anchor.y + anchor.h;
            break;

          case 3:
            xy.x = anchor.x + anchor.w;
            xy.y = anchor.y + anchor.h;
            break;

          case 4:
            xy.x = anchor.x - popup.w;
            xy.y = anchor.y + anchor.h / 2 - popup.h / 2;
            break;

          case 5:
            xy.x = anchor.x + anchor.w / 2 - popup.w / 2;
            xy.y = anchor.y + anchor.h / 2 - popup.h / 2;
            break;

          case 6:
            xy.x = anchor.x + anchor.w;
            xy.y = anchor.y + anchor.h / 2 - popup.h / 2;
            break;

          case 7:
            xy.x = anchor.x - popup.w;
            xy.y = anchor.y - popup.h;
            break;

          case 8:
            xy.x = anchor.x + anchor.w / 2 - popup.w / 2;
            xy.y = anchor.y - popup.h;
            break;

          case 9:
            xy.x = anchor.x + anchor.w;
            xy.y = anchor.y - popup.h;
            break;
        }

        // test if that solution is valid
        if (xy.x >= 0 && xy.y >= 0 && xy.x + popup.w <= page.w && xy.y + popup.h <= page.h)
          return xy;
      }

      return {x: 0, y: 0}; // sanity return
    }
  },

  defer: function(statics) {
    cv.MessageBroker.getInstance().subscribe("setup.dom.finished", statics.init, statics);
  }
});