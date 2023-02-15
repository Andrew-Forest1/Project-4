class UsersController < ApplicationController
    def login
        user = User.find_by(name: params[:name]) #do not use .find, cause you do not want to return any info
        if user&user.authenticate(params[:password]) #smae as user && user.authenticate(params[:password])
            #session[:user_id] = user.id
            render json:user, status: :ok
        else
            render json: {errors: "Incorrect username or password."}
        end
    end

    def index
        render json: User.all, status: :ok
    end
end
