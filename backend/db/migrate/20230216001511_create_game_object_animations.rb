class CreateGameObjectAnimations < ActiveRecord::Migration[7.0]
  def change
    create_table :game_object_animations do |t|
      t.references :game_object, null: false, foreign_key: {on_delete: :cascade}
      t.references :animation, null: false, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
