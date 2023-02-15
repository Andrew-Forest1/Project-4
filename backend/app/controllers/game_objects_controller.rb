class GameObjectsController < ApplicationController
    def create
        go = GameObject.create!(go_params)
        render json: go, status: :created
    end

    def destroy
        go = GameObject.find(params[:id])
        render json: {}, status: :gone
    end

    private

    def go_params
        params.permit(:scene_id, :x_pos, :y_pos, :rotation, :w_scale, :h_scale, :shape)
    end
end
