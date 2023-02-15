class GameObject < ApplicationRecord
    belongs_to :scene
    has_one :game_object_sprite
    has_one :sprite, through: :game_object_sprite
end
