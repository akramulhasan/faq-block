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
        wp_register_script('test-js', plugin_dir_url(__FILE__).'/build/index.js',array('wp-blocks','wp-element','wp-editor'));
        register_block_type('wpfyfaq/wpfy-faq-block',array(
            'editor_script'=> 'test-js',
            'render_callback' => array($this, 'theHTML')
        ) );
        
    }

    function theHTML($attributes){
        //var_dump($attributes);
        ob_start(); ?>
        <div>
            <h3>Hello I am output</h3>
            <!-- <h3>Q: <?php echo esc_html($attributes['question']); ?></h3>
            <p>A: <?php echo esc_html($attributes['answer']); ?></p> -->
        </div>
        <?php return ob_get_clean();
        // return '<p>This is the new output form php file with sky color '.esc_attr($attributes['skyColor']).' and grass color is '.$attributes['grassColor'].'<p>';
    }

}
$wpfy_faq = new WPFY_FAQ();