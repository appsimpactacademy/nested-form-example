class Project < ApplicationRecord
	has_many :tasks, inverse_of: :project, dependent: :destroy
  accepts_nested_attributes_for :tasks, allow_destroy: true, reject_if: :all_blank
end
