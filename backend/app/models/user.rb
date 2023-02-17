class User < ApplicationRecord
    has_many :sprites
    has_many :scenes
    has_secure_password

    validates_presence_of :username, :last_name, :first_name, :password
    validates :password, length: {minimum: 6}
    validates :username, uniqueness: true
end
