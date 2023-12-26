<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'DbYFSE' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '}p@~33pCvH,5Jg&p8+GA)K&,#95^5q~FP_CcxusgMrw)b?Atpm}oetA/+`g0x7fZ' );
define( 'SECURE_AUTH_KEY',  'md393+y j7ec_ Gq=ni=$lJ#jXm]-c(P:YO8{4w_Rgo%$bK;WG|S{8?^D>Zfqw^,' );
define( 'LOGGED_IN_KEY',    'd7U3Qi&Q(7A^leA)B/bA?Yb^:mi} O]/{gom+}[AxY82~#:~tJ0qJ}q49+i^py0/' );
define( 'NONCE_KEY',        '&1y]D56q*a6{_kSCaXfqXf7ya61QM}a3B3ii3+.4-50%SX:4ZZ7JyzUr72-e,XYS' );
define( 'AUTH_SALT',        'v#Lrm@nUnRDRs(4n T6$z[XC6AA#mgvaPu4t/qCW/q~y@,e; 9H$}.Uqy_bD9JTp' );
define( 'SECURE_AUTH_SALT', 'IUoplY7s*$-qmYmJ][ctSD9q+ q4EO}mAyKINJ];93ap;tVGBelwd<wbM>$&hIYk' );
define( 'LOGGED_IN_SALT',   '?<DMuM-(Dm@L.n+{]FF,rA|c;Sr0(J:!]Pf!Vp3%ree}W)h`b5<pYO`d[IPO_tSr' );
define( 'NONCE_SALT',       'Rv60jYePrFZuENIRIeh/:m^+MDv!{<^wbj4T?Vl{}s@h!yJutDeX8b-)]xJNmlU6' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
