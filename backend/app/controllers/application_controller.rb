class ApplicationController < ActionController::API
    include ActionController:Cookies
    
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    private 

    def not_found exception
        render json: {error: "#{exception.model} not found"}, status: :not_found
    end

    def record_invalid(invalid)
        render json: {error: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
