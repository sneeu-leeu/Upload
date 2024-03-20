class AddUserToUploads < ActiveRecord::Migration[7.1]
  def change
    add_reference :uploads, :user, null: false, foreign_key: true
  end
end
