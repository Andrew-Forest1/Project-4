class User < ApplicationRecord
    has_many :sprites
    has_secure_password :password
end
