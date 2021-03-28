class Task < ApplicationRecord
  belongs_to :user
  enum progress: { pending: 0, completed: 1 }
  has_many :comments, dependent: :destroy
  validates :title, presence: true, length: { maximum: 50 }
end