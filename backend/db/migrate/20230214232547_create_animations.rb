class CreateAnimations < ActiveRecord::Migration[7.0]
  def change
    create_table :animations do |t|
      t.string :name

      t.timestamps
    end
  end
end
