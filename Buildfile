# ===========================================================================
# Project:   Whiteboard
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => :sproutcore

config :whiteboard, :layout => 'lib/index.rhtml'

proxy '/socket.io', :to => 'localhost:3002'