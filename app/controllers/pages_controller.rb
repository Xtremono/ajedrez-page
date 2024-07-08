class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def reina
  end

  def rey
  end

  def peon
  end

  def torre
  end

  def caballo
  end

  def alfil
  end
end
