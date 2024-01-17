const path = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const getEntries = require("./tools/webpack/getEntries");
const getJSFiles = require("./tools/webpack/getJSFiles");

const plugins = defaultConfig.plugins.filter(
    (plugin) =>
        plugin.constructor.name != "MiniCssExtractPlugin" &&
        plugin.constructor.name != "CleanWebpackPlugin",
);

const publicJSFolder = path.join(__dirname, "/react-src/public");
const customizerFolder = path.join(__dirname, "/react-src/admin/customizer");
const elementorFolder = path.join(__dirname, "/react-src/elementor");
const blocksEntriesFolder = path.join(__dirname, "/react-src/gutenberg/blocks");
const blocksEditorJSEntries = Object.values(
    getEntries(blocksEntriesFolder, "editor"),
);

const commonCSSEntries = {
    // Common Styles
    "public/css/category-grid": "./react-src/scss/category-grid.scss",
    "public/css/category-box": "./react-src/scss/category-box.scss",
    "public/css/category-grid-list": "./react-src/scss/category-grid-list.scss",
    "public/css/search": "./react-src/scss/shortcodes/search.scss",
    "public/css/social-share": "./react-src/scss/shortcodes/social-share.scss",
    "public/css/feedback-form":
        "./react-src/scss/shortcodes/feedback-form.scss",
    "public/css/faq": "./react-src/scss/shortcodes/faq.scss",
    "public/css/reactions": "./react-src/scss/shortcodes/reactions.scss",
    "public/css/toc": "./react-src/scss/shortcodes/toc.scss",
    "public/css/category-tab-grid":
        "./react-src/scss/shortcodes/category-tab-grid.scss",
    "public/css/popular-articles":
        "./react-src/scss/shortcodes/popular-articles.scss",
    "public/css/related-categories":
        "./react-src/scss/shortcodes/related-categories.scss",
    // Template Parts
    "public/css/breadcrumb": "./react-src/scss/template-parts/breadcrumb.scss",

    // Sidebar
    "public/css/sidebar": "./react-src/scss/template-parts/sidebar.scss",

    // Singles
    "public/css/single": "./react-src/scss/templates/single.scss",
    "public/css/docs": "./react-src/scss/templates/docs-archives.scss",
    "public/css/tax-doc_category":
        "./react-src/scss/templates/taxonomy-doc_category.scss",

    // Blocks Default Styles
    "blocks/categorygrid/default": [
        "./react-src/scss/category-grid.scss",
        "./react-src/scss/blocks/category-grid.scss",
    ],
    "blocks/categorybox/default": [
        "./react-src/scss/category-box.scss",
        "./react-src/scss/blocks/category-box.scss",
    ],
    "blocks/doc-archive-list/default": [
        "./react-src/scss/blocks/title.scss",
        "./react-src/scss/blocks/list.scss",
    ],

    //Feedback form editor style
    "blocks/feedback-form/feedback-editor": [
        "./react-src/gutenberg/blocks/feedback-form/src/style.scss",
    ],

    // Elementor Widgets Styles
    "elementor/css/category-grid":
        "./react-src/scss/elementor/category-grid.scss",
    "elementor/css/category-box":
        "./react-src/scss/elementor/category-box.scss",
    "elementor/css/articles-list":
        "./react-src/scss/elementor/articles-list.scss",
    "elementor/css/navigation": "./react-src/scss/template-parts/nav.scss",
};

const commonJSEntries = {
    "public/js/category-grid": "./react-src/public/category-grid.js",

    // Shortcode JS
    "shortcodes/js/faq": "./react-src/public/shortcodes/faq.js",
    "shortcodes/js/reactions": "./react-src/public/shortcodes/reactions.js",
    "shortcodes/js/search": "./react-src/public/shortcodes/search.js",
};

let entries = {
    ...commonCSSEntries,
    ...commonJSEntries,
    // Blocks Editor JS
    "blocks/editor": blocksEditorJSEntries,
    // Blocks Admin Editor CSS
    "blocks/controls": "./react-src/gutenberg/util/backend.scss",
    "blocks/actions": "./react-src/gutenberg/util/index.js",
    // Block FrontEnd JS
    ...getEntries(blocksEntriesFolder, "frontend"),
    // Elementor Widgets JS
    ...getJSFiles(elementorFolder),
    // Customizer
    ...getJSFiles(customizerFolder),
    // Public
    ...getJSFiles(publicJSFolder),
    // Main CSS
    // [`public/css/betterdocs`]: './react-src/scss/index.scss',
    // Admin Assets
    [`admin/js/betterdocs`]: "./react-src/admin/betterdocs.js",
    [`admin/css/betterdocs`]: "./react-src/admin/scss/admin.scss",
    [`admin/css/global`]: "./react-src/admin/scss/global.scss",
    [`admin/css/analytics`]: "./react-src/admin/scss/analytics.scss",
    // For Settings Only
    [`admin/js/settings`]: "./react-src/admin/settings/index.js",
    // For Quick Setup Only
    [`admin/js/quick-setup`]: './react-src/admin/quick-setup/index.js',
    // For Admin UI Switcher
    [`admin/js/switcher`]: "./react-src/admin/switcher.js",
    // For Category Add/Edit Screen!
    [`admin/js/setup-wizard`]: "./react-src/admin/setup-wizard.js",
    // For Category Add/Edit Screen!
    [`admin/js/category-edit`]: "./react-src/admin/category-edit.js",
    // For FAQ Add/Edit Screen!
    [`admin/js/faq`]: "./react-src/admin/faq-builder/index.js",
};

// entries = commonCSSEntries;

const config = {
    ...defaultConfig,
    entry: entries,
    output: {
        path: path.join(__dirname, "assets/"),
        filename: "[name].js",
    },
    externals: {
        ...defaultConfig?.externals,
        clipboard: "ClipboardJS",
    },
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /\.(jpg|png|gif)$/,
                type: "asset/resource",
                generator: {
                    emit: false,
                    // outputPath: function (pathData) {
                    //     return path.join(path.dirname(pathData.filename)).replace(/^assets\//, '');
                    // },
                    publicPath: function (pathData) {
                        return path
                            .join(path.dirname(pathData.filename), "/")
                            .replace(/^assets\//, "");
                    },
                    filename: "[name][ext]",
                },
            },
        ],
    },
    plugins: [
        ...plugins,
        new RemoveEmptyScriptsPlugin(),
        new MiniCSSExtractPlugin({
            filename: ({ chunk }) =>
                `${chunk.name.replace("/js/", "/css/")}.css`,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: blocksEntriesFolder + "/**/block.json",
                    to: `./blocks`,
                    toType: "dir",
                    context: blocksEntriesFolder,
                },
            ],
            options: {
                concurrency: 50,
            },
        }),
    ],
};

module.exports = config;
