<?php

namespace WPDeveloper\BetterDocs\REST;

use WPDeveloper\BetterDocs\Admin\ReportEmail;
use WP_REST_Request;
use WPDeveloper\BetterDocs\Core\BaseAPI;
use WPDeveloper\BetterDocs\Admin\WPExporter;
use WPDeveloper\BetterDocs\Admin\Importer\WPImport;
use WPDeveloper\BetterDocs\Admin\Importer\Parsers\WXR_Parser_XML;
use WP_Query;

class Settings extends BaseAPI {

    public function permission_check() {
        return true; // current_user_can( 'edit_docs_settings' );
    }

    public function register() {
        $this->get( 'settings', [$this, 'get_settings'] );
        $this->post( 'settings', [$this, 'save_settings'] );
        $this->post( 'plugin_insights', [$this, 'plugin_insights'] );

        $this->post( 'reporting-test', [$this, 'test_reporting'] );
        $this->post( 'export-docs', [$this, 'export_docs'] );
        $this->post( 'export-settings', [$this, 'export_settings'] );
        $this->post( 'import-docs', [$this, 'import_docs'] );
        $this->post( 'import-settings', [$this, 'import_settings'] );
        $this->post( 'perse-file', [$this, 'perse_xml'] );
    }

    public function export_docs( WP_REST_Request $request ) {
        $args               = [
			'include_post_featured_image_as_attachment' => true,
			'status'   => 'publish',
			'content'   => 'docs'
		];

        $data = $request->get_params();

        if ( $data['export_type'] == 'docs' && $data['export_docs'][0] != 'all' ) {
            $args['post__in'] = $data['export_docs'];
        }

        if ( $data['export_type'] == 'doc_category' && $data['export_categories'][0] != 'all' ) {
            $args['category_terms'] = $data['export_categories'];
        }

        if ( $data['export_type'] == 'knowledge_base' && $data['export_kbs'][0] != 'all' ) {
            $args['kb_terms'] = $data['export_kbs'];
        }

        $exporter = new WPExporter( $args );

		return $exporter->run();
    }

    public function export_settings( WP_REST_Request $request ) {
        $betterdocs_settings = get_option('betterdocs_settings');
        $json_str = json_encode($betterdocs_settings, JSON_PRETTY_PRINT);
        $file_name = 'betterdocs-settings.json';
        return [
            'success' => true,
            'data'    => [
                'filename'  => $file_name,
                'filetype'  => 'text/json',
                'download'  => $json_str,
            ]
        ];
    }

    public function import_settings( WP_REST_Request $request ) {
        $settings = $request->get_param('settings');
        // Decode the JSON data into a PHP array
        $settings = json_decode($settings, true);
        $save = update_option( 'betterdocs_settings', $settings );

        if ( $save == true ) {
            return [
                'status' => 'success'
            ];
        } else {
            return [
                'status' => 'failed'
            ];
        }
    }
    public function import_docs( WP_REST_Request $request ) {
        $existing_slug = $request->get_param('existing_slug');
        $action = $request->get_param('action');

        $files = $request->get_file_params();

        $args = [
			'fetch_attachments' => true,
            'existing_slug' => $existing_slug,
            'action' => $action
		];

		$file = $files['file']['tmp_name'];

		$wp_importer = new WPImport( $file, $args );

		return $wp_importer->run();
    }

    public function perse_xml( WP_REST_Request $request ) {
        $data = $request->get_params();

        // Initialize the array for existing post slugs
        $existing_post_slugs = [];

        // Initialize the query arguments
        $args = [
            'post_type' => 'docs', // Change 'post' to your custom post type if applicable
            'post_status' => 'publish',
            'posts_per_page' => -1, // Retrieve all posts
            'fields' => 'ids', // Retrieve only post IDs to reduce memory usage
        ];

        // Create a new instance of WP_Query
        $query = new WP_Query($args);

        // Get an array of post slugs from the query
        $all_post_slugs = array_map(function ($post_id) {
            return get_post_field('post_name', $post_id);
        }, $query->posts);

        // Find the intersection of the two arrays to get existing post slugs
        $existing_post_slugs = array_intersect($data['posts'], $all_post_slugs);

        // Output the array of existing post slugs
        return [
            'status' => 'success',
            'posts' => $existing_post_slugs,
        ];

        // Restore original post data
        wp_reset_postdata();
    }

    public function insights(){
        return true;
    }

    public function get_settings() {
        return betterdocs()->settings->get_all( true );
    }

    public function save_settings( WP_REST_Request $request ) {
        if ( betterdocs()->settings->save_settings( $request->get_params() ) ) {
            return $this->success( __( 'Settings Saved!', 'betterdocs' ) );
        }

        return $this->error( 'nothing_changed', __( 'There are no changes to be saved.', 'betterdocs' ), 200 );
    }

    public function test_reporting( $request ){
        return $this->container->get(ReportEmail::class)->test_email_report( $request );
    }

    public function do_wizard_tracking() {
		$insights = betterdocs()->admin->plugin_insights( true );
		// Get our data
		$insights->schedule_tracking();
        $insights->set_is_tracking_allowed( true, 'betterdocs' );
        if ( $insights->do_tracking( true ) ) {
            $insights->update_block_notice( 'betterdocs' );
        }

        return true;
	}

    public function plugin_insights( $request ){
        if ( $this->do_wizard_tracking() ) {
            wp_send_json_success('done');
        }
        wp_send_json_error('Something went wrong.');
    }
}
