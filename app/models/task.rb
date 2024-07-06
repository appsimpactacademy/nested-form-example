class Task < ApplicationRecord
  belongs_to :project
  belongs_to :task_type

  validates :name, :description, presence: true
end
