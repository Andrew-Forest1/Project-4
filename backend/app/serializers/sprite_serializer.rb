class SpriteSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :private, :image
  has_one :user

  # def image
  #   if object.image.attached?
  #     {
  #       url: rails_blob_url(object.image)
  #     }
  #   end
  # end
end
