/**
 * Plugin configuration.
 */
export default {
    /**
     * Custom element prefix, must be unique
     */
    ce_prefix: 'plugin-template',
    identifier: 'org.username.plugin-template',
    name: 'Cider Plugin Template',
    description: 'A template for creating a Cider plugin.',
    version: '0.0.1',
    author: 'your_username',
    repo: 'https://github.com/ciderapp/plugin-template',
    pluginKitVersion: '4',
    entry: {
        'plugin.js': {
            type: 'main',
        }
    }
}