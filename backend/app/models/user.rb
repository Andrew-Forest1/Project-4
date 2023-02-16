class User < ApplicationRecord
    has_many :sprites
    has_many :scenes
    has_secure_password
end
