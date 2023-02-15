class SpritesController < ApplicationController
    before_action :find_sprite, only: [:show]

    def create
        sprite = Sprite.create!(sprite_params)
        render json: sprite, status: :created
    end

    def show
        render json: @sprite, status: :ok
    end

    def index
        render json: Sprite.all, status: :ok
    end

    private

    def sprite_params
        params.permit(:user_id, :name, :private, :image)
    end

    def find_sprite
        @sprite = Sprite.find(params[:id])
    end
end
