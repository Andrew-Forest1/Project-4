class SessionsController < ApplicationController
    skip_before_action :authorized_user, only: [:login]

    def login
        user = User.find_by(username: params[:username]) #do not use .find, cause you do not want to return any info
        #binding.break
        if user&.authenticate(params[:password]) #smae as user && user.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :ok
        else
            render json: {errors: "Incorrect username or password."}, status: 451
        end
    end

    def logout

    end
end
