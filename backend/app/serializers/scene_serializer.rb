class SceneSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :user
  has_many :game_objects
end
