class Scene < ApplicationRecord
  belongs_to :user
  has_many :game_objects
end
