var _ = require('lodash');

var dollarRegexp = /\$/gi;

/**
 * Safe replace
 *
 * @param suffix
 * @returns {boolean}
 */
if (typeof String.prototype.safeReplace !== 'function') {
    String.prototype.safeReplace = function(exp, replacement) {
        return this.replace(exp, replacement.replace(dollarRegexp, '$$$$'));
    };
}

/**
 * Format a stirng
 *
 * @returns {String}
 */
if (typeof String.prototype.format !== 'function') {
    String.prototype.format = function () {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            // All $ in string will be replaced with $$
            /*jshint -W053 */
            formatted = formatted.safeReplace(regexp, String(arguments[i]));
        }

        return formatted;
    };
}

if (typeof String.prototype.f !== 'function') {
    String.prototype.f = String.prototype.format;
}

/**
 * Test if string end with suffix
 *
 * @param suffix
 * @returns {boolean}
 */
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

module.exports = {
    ucfirst: function (s) {
        return s[0].toUpperCase() + s.slice(1);
    },

    camelCase: function (s) {
        var self = this;

        if (!this.isUpperCase(s)) {
            s = (s || '')
                .replace(/([^\s]\s)([^\s])/g, function (m, g1, g2) {
                    return g1 + (self.isUpperCase(g2) ? g2 : self.ucfirst(g2));
                })
                .replace(/([a-z])([A-Z])/g, '$1-$2');

            // Because Javascript doesn't have look behind
            // We add one more dash to every consecutive dashes
            // eg -- to ---
            // Then split will comsume the extra dash
            s = s.replace(/(\w)(-{2})/g, '$1$2-');

            return _.map(s.split(/-(?=\w)/), function (s) {
                return self.isUpperCase(s) ? s : self.ucfirst(s);
            }).join('');
        }

        return s;
    },

    camelCaseLower: function (s) {
        if (!this.isUpperCase(s)) {
            s = this.camelCase(s);

            return s[0].toLowerCase() + s.slice(1);
        }

        return s;
    },

    camelToDash: function (s) {
        s = s.replace(/(?:([a-z])([A-Z]))/g, '$1-$2');

        return s.toLowerCase();
    },

    isUpperCase: function (s) {
        s = s || '';

        return s === s.toUpperCase();
    }
};
