<?php
/**
 * Plugin Name: View Animation Control
 * Description: Adds a custom control to the Block Editor's "Inspector Controls" for view animations.
 * Version: 0.1
 * Author: Travis Williamson
 */

function view_animation_control_enqueue() {
    wp_enqueue_script(
        'view-animation-control-js',
        plugins_url( 'dist/block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        '1.0.0',
        true
    );
}

add_action( 'enqueue_block_editor_assets', 'view_animation_control_enqueue' );


function add_view_animation_style( $block_content, $block ) {
    // Get the current post ID
    $post_id = get_the_ID();

    // Check if the block has the viewAnimationName attribute set
    if ( isset( $block['attrs']['viewAnimationName'] ) && ! empty( $block['attrs']['viewAnimationName'] ) ) {
        $animation_name = esc_attr( $block['attrs']['viewAnimationName'] );
        // Add the animation name as an inline style and append the post ID to the class
        // Replace only the first occurrence
        $block_content = preg_replace(
            '/class="([^"]*)"/',
            'class="$1 vt-x" style="view-transition-name:vt-' . $animation_name . '-' . $post_id . ';"',
            $block_content,
            1  // Limit the replacement to the first match
        );
    }
    return $block_content;
}

add_filter( 'render_block', 'add_view_animation_style', 10, 2 );


function enqueue_view_animation_styles() {
    if (!is_admin()) {  // Ensure it's not the admin area
        wp_enqueue_style(
            'view-animation-control-style',
            plugins_url('dist/style.css', __FILE__),
            array(),
            filemtime(plugin_dir_path(__FILE__) . 'dist/style.css')
        );
    }
}
add_action('wp_enqueue_scripts', 'enqueue_view_animation_styles');