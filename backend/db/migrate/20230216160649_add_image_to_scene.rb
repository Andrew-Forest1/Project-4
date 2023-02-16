class AddImageToScene < ActiveRecord::Migration[7.0]
  def change
    add_column :scenes, :image, :text
  end
end
