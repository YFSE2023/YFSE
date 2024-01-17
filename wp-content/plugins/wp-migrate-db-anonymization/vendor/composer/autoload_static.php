<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit5aa4a9a9e94fe717a05c9874d4f1a478
{
    public static $files = array (
        'd1642b6f8dc730c225bde2682648ca26' => __DIR__ . '/../..' . '/includes/Compatibility.php',
    );

    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'WPMDB\\Anonymization\\' => 20,
        ),
        'F' => 
        array (
            'Faker\\' => 6,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'WPMDB\\Anonymization\\' => 
        array (
            0 => __DIR__ . '/../..' . '/includes',
        ),
        'Faker\\' => 
        array (
            0 => __DIR__ . '/..' . '/fzaninotto/faker/src/Faker',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit5aa4a9a9e94fe717a05c9874d4f1a478::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit5aa4a9a9e94fe717a05c9874d4f1a478::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
