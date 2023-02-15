class ScenesController < ApplicationController
    before_action :find_scene, only:[:show, :destroy]

    def index
        render json: Scene.all, status: :ok
    end

    def show
        render json: @scene, status: :ok
    end

    def create
        scene = Scene.create!(scene_params)
        render json: scene, status: :created
    end

    def destroy
        @scene.destroy
        render json: {}, status: :gone
    end

    private

    def find_scene
        @scene = Scene.find(params[:id])
    end

    def scene_params
        params.permit(:name, :user_id)
    end

end
