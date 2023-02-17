class SessionsController < ApplicationController
    #skip_before_action :authorized_user, only: [:login]

    def login
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            #binding.break
            session[:user_id] = user.id
            render json: user, status: :ok
        else
            render json: {errors: "Incorrect username or password."}, status: 451
        end
    end

    def logout
        session.delete :user_id
        head :no_content
    end
end
