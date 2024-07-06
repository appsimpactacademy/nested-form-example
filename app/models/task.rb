class Task < ApplicationRecord
  belongs_to :project
  belongs_to :task_type

  validates :name, :description, :task_type_id, presence: true
end
