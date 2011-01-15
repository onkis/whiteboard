# ===========================================================================
# Project:   Whiteboard
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => :sproutcore

proxy '/', :to => 'http://localhost:3002'