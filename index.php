<?php
/*
Plugin Name: WPFY FAQ Block
*/

if( ! defined( 'ABSPATH' ) ) exit;

class WPFY_FAQ{

    function __construct(){
        add_action('init',array($this, 'adminAssets'));
    }

    function adminAssets(){
        wp_register_style('maincss', plugin_dir_url(__FILE__).'/build/style-index.css');
        wp_register_script('mainjs', plugin_dir_url(__FILE__).'/build/index.js',array('wp-blocks','wp-element','wp-editor'));
        register_block_type('wpfyfaq/wpfy-faq-block',array(
            'editor_script'=> 'mainjs',
            'editor_style'=> 'maincss',
            'render_callback' => array($this, 'theHTML')
        ) );
        
    }

    function theHTML($attributes){
        if(!is_admin()){
            wp_enqueue_script('frontendjs', plugin_dir_url(__FILE__ ).'build/frontend.js', array('wp-element'), null, true);
            wp_enqueue_style('frontendcss', plugin_dir_url(__FILE__).'build/frontend.css');
        }
        ob_start(); ?>
        <div class="wpfy-faq-update-me">
            <?php 
            echo '<pre style="display:none">';
                echo wp_json_encode($attributes);
            echo '</pre>';
            ?>
        </div>


        <?php return ob_get_clean();
        // return '<p>This is the new output form php file with sky color '.esc_attr($attributes['skyColor']).' and grass color is '.$attributes['grassColor'].'<p>';
    }

}
$wpfy_faq = new WPFY_FAQ();